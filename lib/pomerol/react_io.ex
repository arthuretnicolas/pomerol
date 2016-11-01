defmodule Pomerol.ReactIO do
  use StdJsonIo, otp_app: :pomerol, script: "node_modules/react-stdio/bin/react-stdio"
end