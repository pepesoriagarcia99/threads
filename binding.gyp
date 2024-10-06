{
  "targets": [
    {
      "target_name": "ThreadModule",
      "sources": [ "./src/Thread.cpp" ],
      "cflags": ["-std=c++17"],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ]
    }
  ]
}