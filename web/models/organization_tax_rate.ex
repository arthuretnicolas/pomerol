defmodule Pomerol.OrganizationTaxRate do
  use Pomerol.Web, :model

  schema "organization_tax_rates" do
    field :name, :string
    field :tax_rate_percent, :integer
    field :default, :boolean
    field :archived, :boolean, default: false
    belongs_to :organization, Pomerol.Organization

    timestamps
  end

  def create_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :tax_rate_percent, :organization_id])
    |> validate_required([:name, :tax_rate_percent, :organization_id])
    |> validate_inclusion(:tax_rate_percent, 0..100)
    |> unique_constraint(:name, name: :organization_tax_rates_organization_id_name_index)
  end

  def create_default_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :tax_rate_percent, :organization_id])
    |> validate_required([:name, :tax_rate_percent, :organization_id])
    |> put_change(:default, true)
    |> validate_inclusion(:tax_rate_percent, 0..100)
    |> unique_constraint(:name, name: :organization_tax_rates_organization_id_name_index)
  end

  def update_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :tax_rate_percent, :default, :archived])
    |> unique_constraint(:name, name: :organization_tax_rates_organization_id_name_index)
    |> validate_inclusion(:tax_rate_percent, 0..100)
    |> validate_inclusion(:default, [true])
    |> validate_archived_and_default
  end

  defp validate_archived_and_default(changeset) do
    archived = get_field(changeset, :archived)
    default = get_field(changeset, :default)

    cond do
      archived == true && default == true ->
        changeset
        |> add_error(:archived, "Cannot archive a default tax rate")
      true ->
        changeset
    end
  end

  def update_default_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:default])
  end

end
