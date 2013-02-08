/*
 * Constants
 */
int DELAY = 10;
int VAL_BIT = 5;
int PIN_BIT = 5;
int MODE_BIT = 2;
int A_MODE = 0;
int D_MODE = 1;
int S_MODE = 2;

/*
 * Setup
 */
void setup() 
{
  Serial.begin(9600);
} 

void decodeShogun(unsigned char mode, unsigned char pin, unsigned char val) {
  if(mode == A_MODE) {
    analogWrite(pin, val);
  } else if(mode == D_MODE) {
    digitalWrite(pin, val);
  } else if(mode == S_MODE) {
    pinMode(pin, val>0? OUTPUT:INPUT);
  }
}

void loop() 
{ 
  if(Serial.available() >= 3){
    unsigned char mode = Serial.read();
    unsigned char pin = Serial.read();
    unsigned char val = Serial.read();
    Serial.read();
    decodeShogun(mode, pin, val);
  }
  delay(DELAY);
} 


