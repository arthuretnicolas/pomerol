defmodule Pomerol.Web do
  @moduledoc """
  A module that keeps using definitions for controllers,
  views and so on.

  This can be used in your application as:

      use Pomerol.Web, :controller
      use Pomerol.Web, :view

  The definitions below will be executed for every view,
  controller, etc, so keep them short and clean, focused
  on imports, uses and aliases.

  Do NOT define functions inside the quoted expressions
  below.
  """

  def model do
    quote do
      use Ecto.Schema
      use Timex.Ecto.Timestamps

      import Ecto
      import Ecto.Changeset
      import Ecto.Query

      @primary_key {:id, :binary_id, autogenerate: true}
      @foreign_key_type :binary_id
    end
  end

  def service do
    quote do
      import Ecto
      import Ecto.Query, only: [from: 1, from: 2]
      alias Ecto.Changeset
      alias Ecto.Multi
      alias Pomerol.Repo
    end
  end

  def controller do
    quote do
      use Phoenix.Controller

      alias Pomerol.Repo
      import Ecto
      import Ecto.Query

      import Pomerol.Router.Helpers
      import Pomerol.Gettext

      import Canary.Plugs
      import Pomerol.AuthenticationHelpers, only: [load_and_authorize_changeset: 2]
    end
  end

  def view do
    quote do
      use Phoenix.View, root: "web/templates"

      # Import convenience functions from controllers
      import Phoenix.Controller, only: [get_csrf_token: 0, get_flash: 2, view_module: 1]

      # Use all HTML functionality (forms, tags, etc)
      use Phoenix.HTML

      import Pomerol.Router.Helpers
      import Pomerol.ErrorHelpers
      import Pomerol.Gettext
    end
  end

  def router do
    quote do
      use Phoenix.Router
    end
  end

  def channel do
    quote do
      use Phoenix.Channel

      alias Pomerol.Repo
      import Ecto
      import Ecto.Query
      import Pomerol.Gettext
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
