WebsocketRails::EventMap.describe do
  namespace :sync do
    subscribe :connected,    to: SyncController, with_method: :connected
    subscribe :change,       to: SyncController, with_method: :change
  end
end
