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
      post "/auth/:provider/callback", AuthController, :callback
      post "/password/request", UserController, :password_reset_request, as: :reset
      post "/password/reset", UserController, :password_reset, as: :reset

      get "/invites/:token", OrganizationInviteController, :show
    end

    scope "/v1", V1, as: :v1 do
      pipe_through [:api, :bearer_auth, :ensure_auth, :current_user]

      resources "/countries", CountryController, only: [:index]
      get "/signout", SessionController, :delete

      get "/user", UserController, :current_user
      resources "/users", UserController, only: [:update]
      post "/session/refresh", SessionController, :refresh
      put "/account/password", UserController, :change_password
      resources "/contacts", ContactController, only: [:show, :update]

      resources "/organizations", OrganizationController, only: [:index, :show, :create] do
        resources "/contacts", ContactController, only: [:index, :create]
        resources "/memberships", OrganizationMembershipController, only: [:update]
        resources "/invites", OrganizationInviteController, only: [:create, :update]
        resources "/quotes", QuoteController, only: [:create]
      end
    end

  end

  scope "/", Pomerol do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end

end
