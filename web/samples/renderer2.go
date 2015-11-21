func main() {
    lis, err := net.Listen("tcp", port)
    if err != nil {
        log.Fatalf("failed to listen: %v", err)
    }
    s := grpc.NewServer()
    pb.RegisterRendererServer(s, &Renderer{})
    log.Printf("Starting on port %v\n",port)
    s.Serve(lis)
}
