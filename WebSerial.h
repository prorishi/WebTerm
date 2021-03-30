#ifndef WebSerial_h
#define WebSerial_h

#include <Arduino.h>

#if defined(ESP8266)
#define HARDWARE "ESP8266"
#include "ESP8266WiFi.h"
#include "ESPAsyncTCP.h"
#include "ESPAsyncWebServer.h"
#elif defined(ESP32)
#define HARDWARE "ESP32"
#include "WiFi.h"
#include "AsyncTCP.h"
#include "ESPAsyncWebServer.h"
#endif

AsyncWebServer server(6969);
AsyncWebSocket socket("/");

void wsRead(String data);

void socketEventHandler(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len)
{
    if (type == WS_EVT_DATA)
    {
        AwsFrameInfo *info = (AwsFrameInfo *)arg;
        if (info->final && info->index == 0 && info->len == len && info->opcode == WS_TEXT)
        {
            data[len] = 0;
            wsRead(String((char *)data));
        }
    }
}

void wsWrite(String data = "", bool breakLine = true)
{
    if (breakLine)
        socket.textAll("\t" + data);
    else
        socket.textAll(data);
}

void wsWrite(char *data, bool breakLine = true)
{
    wsWrite(String(data), breakLine);
}

void wsWrite(int data, bool breakLine = true)
{
    wsWrite(String(data), breakLine);
}

void wsWrite(long data, bool breakLine = true)
{
    wsWrite(String(data), breakLine);
}

void wsWrite(double data, bool breakLine = true)
{
    wsWrite(String(data), breakLine);
}

void wsWrite(float data, bool breakLine = true)
{
    wsWrite(String(data), breakLine);
}

void wsInitialize()
{
    socket.onEvent(socketEventHandler);
    server.addHandler(&socket);
    server.begin();
}

void wsRefresh()
{
    socket.cleanupClients();
}

#endif