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
end
