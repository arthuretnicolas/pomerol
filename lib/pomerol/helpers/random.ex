defmodule Pomerol.Random do
  def hex(n \\ 16) do
    :crypto.strong_rand_bytes(n)
    |> Base.encode16(case: :lower)
  end
end
