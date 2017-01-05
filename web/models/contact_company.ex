defmodule Pomerol.ContactCompany do
  use Pomerol.Web, :model

  schema "contact_companies" do
    field :name, :string

    has_many :contacts, Pomerol.Contact

    timestamps
  end
end
