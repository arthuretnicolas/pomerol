defmodule Pomerol.ContactField do
  use Pomerol.Web, :model

  schema "contact_fields" do
    field :type, :string
    field :value, :string

    belongs_to :contact, Pomerol.Contact

    timestamps
  end
end
