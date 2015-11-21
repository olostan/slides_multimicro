type RendererClient interface {
    Render(ctx context.Context, in *RenderRequest,
           opts ...grpc.CallOption) (*RenderResponse, error)
}

type Renderer struct {}

func (s *Renderer) Render(ctx context.Context,
    req *pb.RenderRequest) (*pb.RenderResponse, error) {
        ...
        return &pb.RenderResponse{Image:buf.Bytes()},nil
}

