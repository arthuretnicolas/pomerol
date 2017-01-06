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
    belongs_to :company, Pomerol.ContactCompany, foreign_key: :contact_company_id

    has_many :fields, Pomerol.ContactField
    has_many :addresses, Pomerol.ContactAddress

    has_many :contact_quotes, Pomerol.QuoteContact
    has_many :quotes, through: [:contact_quotes, :quote]

    timestamps
  end

  def changeset(contact, params \\ %{}) do
    contact
    |> cast(params, [:first_name, :last_name, :email, :contact_type, :organization_id, :user_id])
    |> validate_required([:first_name, :email, :contact_type, :organization_id, :user_id])
    |> assoc_constraint(:user)
    |> assoc_constraint(:organization)
    |> validate_inclusion(:contact_type, contact_types)
    |> cast_assoc(:addresses, required: false, with: &Pomerol.ContactAddress.changeset/2)
    |> cast_assoc(:fields, required: false, with: &Pomerol.ContactField.changeset/2)
    |> validate_model()
    # validate email
  end

  defp validate_model(changeset) do
    contact_type = get_field(changeset, :contact_type)
    case contact_type do
      "person" ->
        changeset
        |> cast_assoc(:company, required: false, with: &Pomerol.ContactCompany.changeset/2)
      "company" ->
        changeset
      nil ->
        changeset
    end
  end

  def create_changeset(contact, params) do
    contact
    |> changeset(params)
  end

  defp contact_types do
    ~w{ company person }
  end

  def preload_all(query, locale) do
    from query, preload: [
      [:organization, :user, :quotes, :company, :addresses, :fields, {:addresses, country: [ translation: ^Pomerol.CountryTranslation.translation_query(locale) ]}]
    ]
  end

end
