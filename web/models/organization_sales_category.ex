defmodule Pomerol.OrganizationSalesCategory do
  use Pomerol.Web, :model

  schema "organization_sales_categories" do
    field :name, :string
    field :description, :string
    field :default, :boolean
    field :archived, :boolean, default: false
    belongs_to :organization_tax_rate, Pomerol.OrganizationTaxRate
    belongs_to :organization, Pomerol.Organization

    timestamps
  end

  def create_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :description, :organization_id, :organization_tax_rate_id])
    |> validate_required([:name, :organization_id, :organization_tax_rate_id])
    |> put_change(:default, false)
    |> unique_constraint(:name, name: :organization_sales_categories_organization_id_name_index)
  end

  def create_default_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :description, :organization_id, :organization_tax_rate_id])
    |> validate_required([:name, :organization_tax_rate_id, :organization_id])
    |> put_change(:default, true)
    |> unique_constraint(:name, name: :organization_sales_categories_organization_id_name_index)
  end

  def update_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :description, :default, :archived, :organization_id, :organization_tax_rate_id])
    |> validate_required([:name, :organization_tax_rate_id])
    |> unique_constraint(:name, name: :organization_sales_categories_organization_id_name_index)
    |> validate_archived_and_default
    |> validate_default_not_false
  end

  defp validate_archived_and_default(changeset) do
    archived = get_field(changeset, :archived)
    default = get_field(changeset, :default)
    case [archived, default] do
      [true, true] ->
        changeset
        |> add_error(:archived, "Cannot archive a default sales category")
      [_, _] -> changeset
    end
  end

  defp validate_default_not_false(changeset) do
    default = get_change(changeset, :default, nil)
    cond do
      default == false ->
        add_error(changeset, :default, "Cannot set default to false")
      true ->
        changeset
    end
  end

  def update_default_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:default])
  end

  def preload_all(query) do
    from query, preload: [
      [:organization_tax_rate, :organization],
    ]
  end
end
