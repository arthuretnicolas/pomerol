defmodule Pomerol.ContactCompany do
  use Pomerol.Web, :model

  schema "contact_companies" do
    field :name, :string

    belongs_to :organization, Pomerol.Organization
    has_many :contacts, Pomerol.Contact

    timestamps
  end

  def changeset(contact, params \\ %{}) do
    contact
    |> cast(params, [:name, :organization_id])
    |> validate_required([:name, :organization_id])
  end
end
