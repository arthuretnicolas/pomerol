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
    plug Corsica, origins: "*", allow_headers: ["content-type"]
  end

  pipeline :bearer_auth do
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  pipeline :ensure_auth do
    plug Guardian.Plug.EnsureAuthenticated, handler: Pomerol.GuardianErrorHandler
  end

  pipeline :current_user do
    plug Pomerol.Plug.CurrentUser
  end

  scope "/api", Pomerol do
    pipe_through [:api, :bearer_auth, :current_user]

    scope "/v1", V1, as: :v1 do
      pipe_through [:api, :bearer_auth, :current_user]

      post "/signup", UserController, :create
      post "/signin", SessionController, :create
      # TODO: needed during dev. remove if unused with react google
      options "/auth/:provider/callback", AuthController, :options
      post "/auth/:provider/callback", AuthController, :callback
      post "/password/request", UserController, :password_reset_request, as: :reset
      post "/password/reset", UserController, :password_reset, as: :reset
      resources "/countries", CountryController, only: [:index]
    end

    scope "/v1", V1, as: :v1 do
      pipe_through [:api, :bearer_auth, :ensure_auth, :current_user]

      get "/user", UserController, :current_user
      resources "/users", UserController, only: [:update]
      post "/session/refresh", SessionController, :refresh
      put "/account/password", UserController, :change_password
      resources "/contacts", ContactController, only: [:create, :show, :update]
      resources "/organizations", OrganizationController, only: [:index, :show, :create]
    end

  end

  scope "/", Pomerol do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end

end
