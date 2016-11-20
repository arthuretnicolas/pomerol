defmodule Pomerol.Router do
  use Pomerol.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  # Other scopes may use custom stacks.
  scope "/api", Pomerol do
    pipe_through :api
    scope "/v1", V1, as: :v1 do
      post "/signup", UserController, :create
      post "/signin", SessionController, :create
      post "/session/refresh", SessionController, :refresh
    end
  end

  scope "/", Pomerol do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end

end
