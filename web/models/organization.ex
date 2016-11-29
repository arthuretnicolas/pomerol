defmodule Pomerol.Organization do
  use Pomerol.Web, :model
  alias Pomerol.{Country, OrganizationMembership}

  schema "organizations" do
    field :name, :string
    field :address, :string
    field :website, :string
    field :phone, :string

    belongs_to :country, Country
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

  def create_changeset(organization, params \\ %{}) do
    organization
    |> cast(params, [:name, :country_id])
    |> validate_required([:name, :country_id])
    |> foreign_key_constraint(:country_id)
  end

  def preload_all(query) do
    from b in query, preload: [:members]
  end
end
