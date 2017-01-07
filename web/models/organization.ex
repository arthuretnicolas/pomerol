defmodule Pomerol.Organization do
  use Arc.Ecto.Schema
  use Pomerol.Web, :model
  import Pomerol.Services.Base64ImageUploaderService
  alias Pomerol.{Country, OrganizationMembership, OrganizationInvite, Quote}

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
    field :timezone, :string, default: "Etc/UTC"
    field :currency_code, :string
    field :datetime_format, :string
    field :currency_format, :string
    field :onboarding, :boolean, default: false

    field :base64_logo_data, :string, virtual: true
    field :logo, Pomerol.OrganizationLogo.Type

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
    |> cast(params, [:name, :address1, :address2, :city, :zip, :state, :website, :phone, :country_id, :base64_logo_data, :alias, :currency_code])
    |> put_change(:alias, params["name"])
    |> validate_required([:name, :country_id, :alias, :currency_code])
    |> validate_length(:alias, min: 1)
    |> prefix_url(:website)
    # |> validate_format(:website, ~r/\A((http|https):\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(([0-9]{1,5})?\/.*)?#=\z/ix)
    |> foreign_key_constraint(:country_id)
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
