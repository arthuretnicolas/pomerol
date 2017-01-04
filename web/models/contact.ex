defmodule Pomerol.Contact do
  use Pomerol.Web, :model

  @primary_key {:id, :binary_id, autogenerate: true}
  @derive {Phoenix.Param, key: :id}
  schema "contacts" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :address1, :string
    field :address2, :string
    field :city, :string
    field :state, :string
    field :zip, :string
    field :contact_type, :string

    belongs_to :country, Pomerol.Country
    belongs_to :organization, Pomerol.Organization
    belongs_to :user, Pomerol.User

    timestamps
  end

  def changeset(contact, params \\ %{}) do
    contact
    |> cast(params, [:first_name, :last_name, :email, :address1, :address2, :city, :state, :zip, :country_id, :contact_type])
    |> validate_required([:first_name, :last_name, :email, :contact_type])
    |> validate_inclusion(:contact_type, contact_types)
  end

  def create_changeset(contact, params) do
    contact
    |> changeset(params)
    |> cast(params, [:user_id, :organization_id])
    |> validate_required([:user_id, :organization_id])
    |> assoc_constraint(:user)
    |> assoc_constraint(:organization)
  end

  defp contact_types do
    ~w{ company person }
  end

end
