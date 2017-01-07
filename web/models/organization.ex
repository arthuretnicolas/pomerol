defmodule Pomerol.Organization do
  use Arc.Ecto.Schema
  use Pomerol.Web, :model
  import Pomerol.Services.Base64ImageUploaderService
  alias Pomerol.{Country, OrganizationMembership, OrganizationInvite, Quote, CountryService}
  import Pomerol.ModelUtil

  schema "organizations" do
    field :name, :string
    field :alias, :string
    field :address1, :string
    field :address2, :string
    field :city, :string
    field :zip, :string
    field :state, :string
    field :website, :string
    field :phone, :string
    field :timezone, :string
    field :currency_code, :string
    field :datetime_format, :string
    field :currency_format, :string
    field :onboarding, :boolean, default: false

    field :base64_logo_data, :string, virtual: true
    field :logo, Pomerol.OrganizationLogo.Type

    field :country_code, :string, virtual: true
    belongs_to :country, Country

    has_many :organization_memberships, OrganizationMembership
    has_many :members, through: [:organization_memberships, :member]

    has_many :contacts, Pomerol.Contact
    has_many :organization_invites, OrganizationInvite

    has_many :quotes, Pomerol.Quote

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
    |> cast(params, [:name, :address1, :address2, :city, :zip, :state, :website, :phone, :country_code])
    |> validate_required([:name, :country_code])
    |> set_default_value_to(field: :alias, value: params["name"])
    |> set_default_value_to(field: :currency_code, value: params["currency_code"])
    |> validate_inclusion(:country_code, Pomerol.SupportedEnums.country_codes)
    |> map_from(:country_code, to: :country_id, resolver: &(CountryService.by(country_code: &1)))
    |> validate_length(:name, min: 1)
    |> prefix_url(:website)
  end

  def update_changeset(organization, params \\ %{}) do
    organization
    |> cast(params, [:name, :timezone, :base64_logo_data, :alias])
    |> validate_inclusion(:timezone, Pomerol.SupportedEnums.timezones)
    |> upload_image(:base64_logo_data, :logo)
  end

  defp prefix_url(changeset, key) do
    changeset
    |> update_change(key, &do_prefix_url/1)
  end
  defp do_prefix_url(nil), do: nil
  defp do_prefix_url("http://" <> rest), do: "http://" <> rest
  defp do_prefix_url("https://" <> rest), do: "https://" <> rest
  defp do_prefix_url(value), do: "http://" <> value

  def preload_all(query, locale) do
    from query, preload: [
      [:members, :contacts, :organization_memberships, {:organization_invites, :user}, :quotes],
      country: [ translation: ^Pomerol.CountryTranslation.translation_query(locale) ]
    ]
  end
end
