  private class DispatcherImpl implements DispatcherGrpc.Dispatcher {

    public DispatcherImpl() {
    }

    @Override
    public void dispatch(
        DispatcherOuterClass.DispatchRequest request,
        StreamObserver<DispatcherOuterClass.DispatchReply> responseObserver)
    {
      reply = DispatcherOuterClass.DispatchReply.newBuilder()
                  .setImage(renderResponse.getImage())
                  .build();
      responseObserver.onNext(reply);
    }
  }
