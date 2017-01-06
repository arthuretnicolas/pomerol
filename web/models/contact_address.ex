defmodule Pomerol.ContactAddress do
  use Pomerol.Web, :model

  schema "contact_addresses" do
    field :type, :string
    field :address1, :string
    field :address2, :string
    field :city, :string
    field :zip, :string
    field :state, :string

    belongs_to :contact, Pomerol.Contact
    belongs_to :country, Pomerol.Country

    timestamps
  end

  def changeset(contact, params \\ %{}) do
    contact
    |> cast(params, [:city, :contact_id, :country_id, :type])
    |> validate_required([:city, :type])
    |> validate_inclusion(:type, address_types)
  end

  defp address_types do
    ~w{ primary postal physical }
  end
end
