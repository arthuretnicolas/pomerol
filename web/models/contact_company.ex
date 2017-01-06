defmodule Pomerol.ContactCompany do
  use Pomerol.Web, :model

  schema "contact_companies" do
    field :name, :string

    has_many :contacts, Pomerol.Contact

    timestamps
  end

  def changeset(contact, params \\ %{}) do
    contact
    |> cast(params, [:name])
    |> validate_required([:name])
  end
end
