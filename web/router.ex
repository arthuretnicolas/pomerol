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
    plug Plug.Locale
  end

  pipeline :bearer_auth do
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  pipeline :ensure_auth do
    plug Guardian.Plug.EnsureAuthenticated
  end

  pipeline :current_user do
    plug Pomerol.Plug.CurrentUser
  end

  scope "/api", Pomerol do

    pipe_through [:api, :bearer_auth, :current_user]
    scope "/v1", V1, as: :v1 do
      post "/signup", UserController, :create
      post "/signin", SessionController, :create
      post "/password/request", UserController, :password_reset_request, as: :reset
      post "/password/reset", UserController, :password_reset, as: :reset
      resources "/countries", CountryController, only: [:index]
    end

    pipe_through [:api, :bearer_auth, :ensure_auth]
    scope "/v1", V1, as: :v1 do
      post "/session/refresh", SessionController, :refresh
      resources "/organizations", OrganizationController, only: [:index]
    end

  end

  scope "/", Pomerol do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end

end
