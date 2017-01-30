defmodule Pomerol.Contact do
  use Pomerol.Web, :model
  import Pomerol.ValidationHelpers
  alias Pomerol.Repo

  schema "contacts" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :contact_type, :string
    field :archived, :boolean, default: false

    field :company_name, :string, virtual: true
    field :company_id, :string, virtual: true

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
    |> cast(params, [:email, :contact_type])
    |> validate_required([:email, :contact_type])
    |> update_change(:email, &String.downcase/1)
    |> validate_email_format(:email)
    |> assoc_constraint(:user)
    |> assoc_constraint(:organization)
    |> validate_inclusion(:contact_type, contact_types)
    |> cast_assoc(:addresses, required: false, with: &Pomerol.ContactAddress.changeset/2)
    |> cast_assoc(:fields, required: false, with: &Pomerol.ContactField.changeset/2)
    |> cast_by_type(params)
  end

  defp cast_by_type(changeset, params) do
    case get_field(changeset, :contact_type) do
      "person" ->
        changeset
        |> cast(params, ~w(first_name), ~w(last_name company_id company_name))
        |> validate_company_params
      "company" ->
        changeset
        |> cast(params, ~w(company_name), ~w())
        |> ensure_presence_of_company_name_and_put_company
      _ -> changeset
    end
  end

  defp validate_company_params(changeset) do
    company_id = changeset |> get_field(:company_id)
    company_name = changeset |> get_field(:company_name)
    organization_id = changeset |> get_field(:organization_id)

    case [company_id, company_name] do
      # no company for this contact
      [nil, nil] -> changeset
      # create a contact_company
      [nil, _] ->
        contact_company_changeset = %Pomerol.ContactCompany{} |> Pomerol.ContactCompany.changeset(%{organization_id: organization_id, name: company_name})
        changeset
        |> put_assoc(:company, contact_company_changeset)
      # assoc an existing contact_company
      [_, nil] ->
        company = Repo.get_by!(Pomerol.ContactCompany, id: company_id)
        changeset
        |> put_assoc(:company, company)
      # try to assoc a company and create one -> bad guy!
      [_, _] ->
        changeset
        |> add_error(:company_name, "Cannot give me company_name and company_id")
    end
  end

  defp ensure_presence_of_company_name_and_put_company(%Ecto.Changeset{params: params} = changeset) do
    organization_id = changeset |> get_field(:organization_id)
    if params["company_name"] do
      company_name = changeset |> get_field(:company_name)
      contact_company_changeset = %Pomerol.ContactCompany{} |> Pomerol.ContactCompany.changeset(%{organization_id: organization_id, name: company_name})
      changeset
      |> put_assoc(:company, contact_company_changeset)
    else
      changeset
    end
  end

  def create_changeset(contact, params) do
    contact
    |> cast(params, [:organization_id, :user_id])
    |> validate_required([:organization_id, :user_id])
    |> changeset(params)
  end

  def update_changeset(contact, params) do
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
