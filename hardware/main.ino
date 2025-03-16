#include <dht.h>
dht DHT;

#define DHT22_PIN 2
const int crankPin = A0;
const int trigPin = 10;
const int echoPin = 9;
const int ledPin = 6;

float duration, distance, humidity, crankVoltage, incomingByte;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
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
  crankVoltage = analogRead(crankPin);
  
  if (Serial.available()) {
    incomingByte = Serial.read();
    if (incomingByte == 49.0) {
      digitalWrite(ledPin, HIGH);
    } else if (incomingByte == 48.0) {
      digitalWrite(ledPin, LOW);
    }
  }

  Serial.println(String(humidity) + "," + String(crankVoltage) + "," + String(distance));
  delay(500);
}