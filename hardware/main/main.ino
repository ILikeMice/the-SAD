/*
 * HC-SR04 example sketch
 *
 * https://create.arduino.cc/projecthub/Isaac100/getting-started-with-the-hc-sr04-ultrasonic-sensor-036380
 *
 * by Isaac100
 */

#include <dht.h>
dht DHT;

#define DHT22_PIN 2
const int crankPin = A0;
const int trigPin = 10;
const int echoPin = 9;
const int potPin = A5;

float duration, distance, humidity, temperature, crankVoltage, potValue;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = (duration*.0343)/2;
  int chk = DHT.read22(DHT22_PIN);
  humidity = DHT.humidity;
  temperature = DHT.temperature;
  crankVoltage = analogRead(crankPin);
  potValue = analogRead(potPin);

  Serial.print(String(humidity) + ", " + String(temperature) + ", " + String(crankVoltage) + ", " + String(distance) + ", " + String(potValue) + "\n");
  delay(100);
}