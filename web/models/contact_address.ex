defmodule Pomerol.ContactAddress do
  use Pomerol.Web, :model
  alias Pomerol.CountryService
  import Pomerol.ModelUtil

  schema "contact_addresses" do
    field :type, :string
    field :address1, :string
    field :address2, :string
    field :city, :string
    field :zip, :string
    field :state, :string
    field :country_code, :string, virtual: true

    belongs_to :contact, Pomerol.Contact
    belongs_to :country, Pomerol.Country

    timestamps
  end

  def changeset(contact, params \\ %{}) do
    contact
    |> cast(params, [:contact_id, :country_code, :type, :address1, :address2, :city, :zip, :state])
    |> validate_required([:address1, :city, :zip, :state, :country_code, :type])
    |> validate_inclusion(:type, address_types)
    |> validate_inclusion(:country_code, Pomerol.SupportedEnums.country_codes)
    |> map_from(:country_code, to: :country_id, resolver: &(CountryService.by(country_code: &1)))
  end

  defp address_types do
    ~w{ primary postal physical }
  end
end
