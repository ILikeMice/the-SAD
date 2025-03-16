import asyncio
import enum
import json
import time

import serial
from websockets.asyncio.server import serve
from websockets.exceptions import ConnectionClosedError

SERVER = ("localhost", 3215)
USB_PORT = "COM4"


class MessageType(enum.Enum):
    """Enum of message types"""

    CRANK = "crank"
    CRANK_LED = "crank-led"
    DISTANCE = "distance"
    HUMIDITY = "humidity"


ser = serial.Serial(USB_PORT, 9600, timeout=1)
time.sleep(0.5)

# Track connected clients
connected_clients = set()


async def handle_connection(websocket):
    """Handy websocket connections"""
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            print(f"Received from client: {message}")

            try:
                data = json.loads(message)
                print(f"JSON data from client: {data}")
                if data["type"] == MessageType.CRANK_LED.value:
                    ser.write(b"1" if data["value"] else b"0")

            except json.JSONDecodeError:
                print("Invalid JSON received from client")
    except ConnectionClosedError:
        print("Client disconnected unexpectedly")
    finally:
        connected_clients.remove(websocket)


async def check_and_broadcast():
    """Broadcast serial data into the websocket"""
    while True:
        try:
            if ser.in_waiting > 0:
                line = ser.readline().decode("utf-8").strip()
                print(f"From serial: {line}")
                humidity, crank, distance = line.split(",")

                data = [
                    {"type": MessageType.CRANK.value, "value": float(crank)},
                    {"type": MessageType.DISTANCE.value, "value": float(distance)},
                    {"type": MessageType.HUMIDITY.value, "value": float(humidity)},
                ]

                # Broadcast to all connected clients
                if connected_clients:
                    for packet in data:  # Send them in bulk? nah, just spam
                        message = json.dumps(packet)
                        await asyncio.gather(
                            *[client.send(message) for client in connected_clients]
                        )

        except Exception as e:
            print(f"Error in check_and_broadcast: {e}")

        await asyncio.sleep(0.1)  # Check 10 times per second


async def main():
    """Main entry point"""
    async with serve(handle_connection, SERVER[0], SERVER[1]):
        asyncio.create_task(check_and_broadcast())

        await asyncio.Future()


# Start the server
asyncio.run(main())
