defmodule Pomerol.UserOrganization do
  use Pomerol.Web, :model

  alias Pomerol.{User, Organization}

  schema "user_organizations" do
    belongs_to :user, User
    belongs_to :organization, Organization

    timestamps
  end

  @required_fields ~w(user_id organization_id)a
  @optional_fields ~w()a

  def changeset(user_organization, params \\ %{}) do
    user_organization
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end

end
