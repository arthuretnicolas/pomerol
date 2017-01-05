defmodule Pomerol.Contact do
  use Pomerol.Web, :model

  schema "contacts" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :contact_type, :string
    field :archived, :boolean, default: false

    belongs_to :organization, Pomerol.Organization
    belongs_to :user, Pomerol.User
    belongs_to :contact_company, Pomerol.ContactCompany

    has_many :contact_fields, Pomerol.ContactField
    has_many :contact_addresses, Pomerol.ContactAddress

    has_many :contact_quotes, Pomerol.QuoteContact
    has_many :quotes, through: [:contact_quotes, :quote]

    has_many :team_members, through: [:contact_company, :contacts]

    timestamps
  end

  def changeset(contact, params \\ %{}) do
    contact
    |> cast(params, [:first_name, :last_name, :email, :contact_type])
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
