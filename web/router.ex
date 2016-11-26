defmodule Pomerol.Router do
  use Pomerol.Web, :router
  alias Pomerol.Plug, as: Plug

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    # plug Plug.Locale
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Plug.PutAPIHeaders
    plug Plug.Locale
  end

  pipeline :api_auth do
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  scope "/api", Pomerol do
    pipe_through [:api, :api_auth]
    scope "/v1", V1, as: :v1 do
      post "/signup", UserController, :create
      post "/signin", SessionController, :create
      post "/session/refresh", SessionController, :refresh
      post "/password/request", UserController, :password_reset_request, as: :reset
      post "/password/reset", UserController, :password_reset, as: :reset

      resources "/organizations", OrganizationController, only: [:index]
      resources "/countries", CountryController, only: [:index]
    end
  end

  scope "/", Pomerol do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end

end
