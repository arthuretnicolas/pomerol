defmodule Pomerol.OrganizationItem do
  use Pomerol.Web, :model

  schema "organization_items" do
    # type : price-item, text-item
    field :type, :string
    field :option_type, :string, default: "not-optional"
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

    belongs_to :organization_tax_rate, Pomerol.OrganizationTaxRate
    belongs_to :organization_sales_category, Pomerol.OrganizationSalesCategory
    belongs_to :organization, Pomerol.Organization

    has_many :organization_item_attachments, Pomerol.OrganizationItemAttachment

    timestamps
  end

  def create_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :description, :organization_id])
    |> validate_required([:title, :description, :organization_id])
  end

  def update_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :description, :organization_id])
    |> validate_required([:title, :description, :organization_id])
  end
end
