defmodule Pomerol.PageController do
  use Pomerol.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
