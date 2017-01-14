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
    field :date_format, :string
    field :currency_locale, :string
    field :onboarding, :boolean, default: false

    field :base64_logo_data, :string, virtual: true
    field :logo, Pomerol.OrganizationLogo.Type

    field :country_code, :string, virtual: true
    belongs_to :country, Country

    # Default template style fields
    field :button_color, :string, default: "006699"
    field :highlight_color, :string, default: "EEF4F8"
    field :background_color, :string, default: "FFFFFF"
    field :contact_inc_details, :boolean, default: false
    field :contact_format, :string, default: "columns"
    field :show_pdf, :boolean, default: false
    field :pdf_page_size, :string
    field :layout_aligned, :string, default: "left"
    field :font_heading, :string, default: "helvetica"
    field :font_weight, :string, default: "bold"
    field :font_body, :string, default: "helvetica"

    has_many :organization_memberships, OrganizationMembership
    has_many :members, through: [:organization_memberships, :member]

    has_many :contacts, Pomerol.Contact
    has_many :organization_invites, OrganizationInvite
    has_many :quotes, Pomerol.Quote
    has_many :tax_rates, Pomerol.OrganizationTaxRate
    has_many :transactional_emails, Pomerol.OrganizationTransactionalEmail
    has_many :sales_categories, Pomerol.OrganizationSalesCategory
    has_many :notification_emails, Pomerol.NotificationEmail
    has_many :organization_items, Pomerol.OrganizationItem

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
    |> validate_inclusion(:country_code, Pomerol.SupportedEnums.country_codes)
    |> validate_length(:name, min: 1)
    |> prefix_url(:website)
    |> put_default_settings
  end

  def update_changeset(organization, params \\ %{}) do
    organization
    |> cast(params, [:name, :timezone, :base64_logo_data, :alias])
    |> validate_inclusion(:timezone, Pomerol.SupportedEnums.timezones)
    |> upload_image(:base64_logo_data, :logo)
  end

  defp put_default_settings(current_changeset) do
    case current_changeset do
      %Ecto.Changeset{valid?: true, changes: %{country_code: country_code}} ->
        country = CountryService.by(country_code: country_code)
        current_changeset
        |> put_change(:currency_code, country.default_currency_code)
        |> put_change(:currency_locale, country.default_currency_locale)
        |> put_change(:date_format, country.default_date_format)
        |> put_change(:country_id, country.id)
      _ ->
        current_changeset
    end
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
      [:members, :contacts, :organization_memberships, {:organization_invites, :user}, :quotes, :tax_rates, :sales_categories, {:sales_categories, :organization_tax_rate}, :transactional_emails, :notification_emails, :organization_items],
      country: [translation: ^Pomerol.CountryTranslation.translation_query(locale)]
    ]
  end
end
