#include <SoftwareSerial.h>
#include "Timer.h"

SoftwareSerial mySerial(5, 6);
Timer t;
int inPin = 0;
int val;
int serial;
void repeat() {
  mySerial.println("&value=" + String(val) + "&serial=" + String(serial++));
}
void setup()
{
  Serial.begin(9600); // open serial, set baud rate to 9600 bps
  pinMode(inPin, INPUT); // 7번 핀을 input 모드로 설정
  mySerial.begin(9600);
  t.every(300, repeat);
  // Start up the library
  // sensors.begin();
}
void loop()
{

  val = analogRead(inPin);   // 디지털 핀 번호에 맞게 수정
  //Serial.println(val,DEC); //print sound value to Serial
  delay(100);
  t.update();
  while (mySerial.available())Serial.print((char)mySerial.read());
}

