#include <napi.h>
#include <csignal>
#include <iostream>
#include <unistd.h>

class Thread : public Napi::ObjectWrap<Thread> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports) {
        Napi::Function func = DefineClass(env, "Thread", {
            InstanceMethod("send", &Thread::Send)
        });

        constructor = Napi::Persistent(func);
        constructor.SuppressDestruct();

        exports.Set("Thread", func);
        return exports;
    }

    Thread(const Napi::CallbackInfo& info) : Napi::ObjectWrap<Thread>(info) {
        Napi::Env env = info.Env();
        Napi::HandleScope scope(env);

        if (info.Length() < 1 || !info[0].IsNumber()) {
            Napi::TypeError::New(env, "PID expected").ThrowAsJavaScriptException();
            return;
        }

        targetPid = info[0].As<Napi::Number>().Int32Value();
    }

    void Send(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        if (kill(targetPid, SIGUSR1) == -1) {
            Napi::Error::New(env, "Error sending signal").ThrowAsJavaScriptException();
        }
    }

private:
    static Napi::FunctionReference constructor;
    pid_t targetPid;
};

Napi::FunctionReference Thread::constructor;

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
    return Thread::Init(env, exports);
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, InitAll)
