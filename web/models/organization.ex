defmodule Pomerol.Organization do
  use Pomerol.Web, :model
  alias Pomerol.{OrganizationMembership}

  schema "organizations" do
    field :name, :string

    has_many :organization_memberships, OrganizationMembership
    has_many :members, through: [:organization_memberships, :member]

    timestamps
  end

  @required_fields ~w(name)
  @optional_fields ~w()

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def preload_all(query) do
    from b in query, preload: [:members]
  end
end
