defmodule Pomerol.PageController do
  use Pomerol.Web, :controller

  def index(conn, _params) do
    initial_state = %{}
    props = %{
      "location" => conn.request_path
    }

    result = Pomerol.ReactIO.json_call!(%{
      component: "./priv/static/server/js/pomerol.js",
      props: props
    })

    render(conn, "index.html", html: result["html"], props: initial_state)
  end
end
