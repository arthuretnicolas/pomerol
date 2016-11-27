defmodule Pomerol.Organization do
  use Pomerol.Web, :model

  alias __MODULE__
  alias Pomerol.{OrganizationMembership, User}

  schema "organizations" do
    field :name, :string

    has_many :organization_memberships, OrganizationMembership
    has_many :members, through: [:organization_memberships, :member]

    timestamps
  end

  @required_fields ~w(name user_id)
  @optional_fields ~w()

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def not_owned_by(query \\ %Organization{}, user_id) do
    from b in query,
    where: b.user_id != ^user_id
  end

  def preload_all(query) do
    from b in query, preload: [:user, :members]
  end

end

defimpl Poison.Encoder, for: Pomerol.Organization do
  def encode(model, options) do
    model
    |> Map.take([:name, :user, :members])
    # |> Map.put(:id, Pomerol.Organization.slug_id(model))
    |> Poison.Encoder.encode(options)
  end
end
