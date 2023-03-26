const initHttpMocks = async () => {
  if (typeof window === "undefined") {
    const { server } = await import("./server");
    console.log("server mocks enabled");
    server.listen();
  } else {
    const { worker } = await import("./browser");
    console.log("client mocks enabled");
    worker.start();
  }
};

initHttpMocks();

export {};
