defmodule Pomerol.Organization do
  use Arc.Ecto.Schema
  use Pomerol.Web, :model
  import Pomerol.Services.Base64ImageUploaderService
  alias Pomerol.{Country, OrganizationMembership}

  schema "organizations" do
    field :name, :string
    field :address, :string
    field :website, :string
    field :phone, :string

<<<<<<< HEAD
    field :base64_logo_data, :string, virtual: true
=======
    field :base64_icon_data, :string, virtual: true
>>>>>>> 6de14238f5615296c12c58affac3476c853146da
    field :logo, Pomerol.OrganizationLogo.Type

    belongs_to :country, Country
    has_many :organization_memberships, OrganizationMembership
    has_many :members, through: [:organization_memberships, :member]

    has_many :contacts, Pomerol.Contact

    timestamps
  end

  @required_fields ~w(name)
  @optional_fields ~w()

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def create_changeset(organization, params \\ %{}) do
    organization
    |> cast(params, [:name, :address, :website, :phone, :country_id, :base64_logo_data])
    |> validate_required([:name, :country_id])
    |> foreign_key_constraint(:country_id)
    |> upload_image(:base64_logo_data, :logo)
  end

  def preload_all(query, locale) do
    from query, preload: [
      [:members, :contacts, :organization_memberships],
      country: [ translation: ^Pomerol.CountryTranslation.translation_query(locale) ]
    ]
  end
end
