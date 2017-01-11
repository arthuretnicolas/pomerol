defmodule Pomerol.V1.OrganizationSalesCategoryController  do
  use Pomerol.Web, :controller

  alias Pomerol.{OrganizationSalesCategory, OrganizationSalesCategoryService}

  plug :load_and_authorize_changeset, model: OrganizationSalesCategory, only: [:create, :update]

  def create(conn, params) do
    changeset = OrganizationSalesCategory.create_changeset(%OrganizationSalesCategory{}, params)

    case Repo.insert(changeset) do
      {:ok, organization_sales_category} ->
        organization_sales_category = OrganizationSalesCategory |> OrganizationSalesCategory.preload_all() |> Repo.get!(organization_sales_category.id)
        conn
        |> put_status(:created)
        |> render(Pomerol.OrganizationSalesCategoryView, "show.json", organization_sales_category: organization_sales_category)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update(conn, params) do
    organization_sales_category = Repo.get_by!(OrganizationSalesCategory, id: params["id"])

    case OrganizationSalesCategoryService.update(organization_sales_category, params) do
      {:ok, organization_sales_category} ->
        organization_sales_category = OrganizationSalesCategory |> OrganizationSalesCategory.preload_all() |> Repo.get!(organization_sales_category.id)
        conn
        |> put_status(:ok)
        |> render(Pomerol.OrganizationSalesCategoryView, "show.json", organization_sales_category: organization_sales_category)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.ErrorView, "422.json", changeset: changeset)
    end
  end

end
