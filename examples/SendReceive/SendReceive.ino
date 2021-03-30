#include <WebTerm.h>

#define SSID ""             // Replace with the SSID of your NetWork
#define PWD ""              // Replace with the PassWord of your NetWork

void wRecv(String data) {
    Serial.print("Just received: "); 
    Serial.println(data);
}

void setup() {
    Serial.begin(115200);

    WiFi.begin(SSID, PWD);
    while (WiFi.status() != WL_CONNECTED) delay(100);

    Serial.print("\nConnected!\nIP: ");
    Serial.println(WiFi.localIP());

    wInit();
}

void loop() {
    if (Serial.available()) {
        wSend(Serial.readString());
    }
    wRefresh(); // optional
}
