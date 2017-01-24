defmodule Pomerol.OrganizationItem do
  use Pomerol.Web, :model

  schema "organization_items" do
    # type : price-item, text-item
    field :type, :string
    field :option_type, :string
    field :code, :string
    field :title, :string
    field :description, :string
    field :price_unit, :integer
    field :quantity, :integer
    field :cost_price, :integer
    field :subscription_frequence, :integer
    field :subscription_type, :string
    field :subscription_duration, :integer
    field :editable_quantity, :boolean, default: false, null: false
    field :discount_percent, :integer
    field :archived, :boolean, default: false, null: false
    field :selected, :boolean

    belongs_to :tax_rate, Pomerol.OrganizationTaxRate
    belongs_to :sales_category, Pomerol.OrganizationSalesCategory
    belongs_to :organization, Pomerol.Organization

    has_many :attachments, Pomerol.OrganizationItemAttachment

    timestamps
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:type, :title, :description, :organization_id])
    |> validate_required([:type, :title, :organization_id])
  end

  def create_changeset(struct, params \\ %{}) do
    struct
    |> changeset(params)
    |> cast_by_type(params)
    |> cast_by_option_type(params)
    |> validate_inclusion(:option_type, ~w{ optional not-optional multiple-choice })
    |> validate_if_subscription(params)
  end

  defp cast_by_type(changeset, params) do
    case get_field(changeset, :type) do
      "text-item" -> cast(changeset, params, ~w(), ~w())
      "price-item" -> cast(changeset, params, ~w(tax_rate_id sales_category_id code option_type editable_quantity), ~w(discount_percent cost_price price_unit quantity subscription_frequence subscription_type subscription_duration))
      _ -> changeset
    end
  end

  defp cast_by_option_type(changeset, params) do
    case get_field(changeset, :option_type) do
      "optional" -> cast(changeset, params, ~w(selected), ~w())
      _ -> changeset
    end
  end

  defp validate_if_subscription(changeset, params) do
    case get_field(changeset, :subscription_frequence) do
      nil -> changeset
      _ -> changeset |> validate_required([:subscription_frequence, :subscription_type]) |> validate_inclusion(:subscription_type, ~w{ week month year})
    end
  end

  def update_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :description, :organization_id])
    |> validate_required([:title, :description, :organization_id])
  end
end
