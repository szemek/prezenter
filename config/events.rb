WebsocketRails::EventMap.describe do
  namespace :sync do
    subscribe :connected,    to: SyncController, with_method: :connected
  end
end
