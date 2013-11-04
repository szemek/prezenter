class SyncController < WebsocketRails::BaseController
  def connected
    send_message :connected, { message: "Hello :)" }
  end

  def change
    broadcast_message :update, message
  end
end
