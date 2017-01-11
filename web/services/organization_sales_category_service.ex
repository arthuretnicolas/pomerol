defmodule Pomerol.OrganizationSalesCategoryService do
  use Pomerol.Web, :service
  alias Pomerol.{Repo, OrganizationSalesCategory, Organization}
  alias Ecto.Multi
  import Ecto.Query

  def update(%OrganizationSalesCategory{} = organization_sales_category, attributes) do
    changeset = organization_sales_category |> OrganizationSalesCategory.update_changeset(attributes)
    do_update(changeset)
  end

  defp do_update(%Changeset{changes: %{default: true}} = changeset) do
    multi =
      Multi.new
      |> Multi.update(:organization_sales_category, changeset)
      |> Multi.run(:update_old_default_sales_category, &update_old_default_sales_category/1)

    case Repo.transaction(multi) do
      {:ok, %{
        organization_sales_category: organization_sales_category
      }} ->
        {:ok, organization_sales_category}
      {:error, :organization_sales_category, %Ecto.Changeset{} = changeset, %{}} ->
        {:error, changeset}
      {:error, _failed_operation, _failed_value, _changes_so_far} ->
        {:error, :unhandled}
    end
  end

  defp do_update(%Changeset{} = changeset) do
    with {:ok, organization_sales_category} <- Repo.update(changeset) do
      {:ok, organization_sales_category}
    else
      {:error, changeset} -> {:error, changeset}
      _ -> {:error, :unhandled}
    end
  end

  defp update_old_default_sales_category(%{organization_sales_category: %OrganizationSalesCategory{id: id, organization_id: organization_id}}) do
    old_organization_sales_category_default =
      from(o in OrganizationSalesCategory, where: o.id != ^id and o.organization_id == ^organization_id and o.default == true)
      |> Repo.one()

    old_organization_sales_category_default
    |> OrganizationSalesCategory.update_default_changeset(%{default: false})
    |> Repo.update
  end

end
