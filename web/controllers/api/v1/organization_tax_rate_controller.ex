defmodule Pomerol.V1.OrganizationTaxRateController  do
  use Pomerol.Web, :controller

  alias Pomerol.{OrganizationTaxRate, OrganizationTaxRateService}

  plug :load_and_authorize_changeset, model: OrganizationTaxRate, only: [:create, :update]

  def create(conn, params) do
    changeset = OrganizationTaxRate.create_changeset(%OrganizationTaxRate{}, params)

    case Repo.insert(changeset) do
      {:ok, organization_tax_rate} ->
        conn
        |> put_status(:created)
        |> render(Pomerol.OrganizationTaxRateView, "show.json", organization_tax_rate: organization_tax_rate)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update(conn, params) do
    organization_tax_rate = Repo.get_by!(OrganizationTaxRate, id: params["id"])

    case OrganizationTaxRateService.update(organization_tax_rate, params) do
      {:ok, organization_tax_rate} ->
        conn
        |> put_status(:ok)
        |> render(Pomerol.OrganizationTaxRateView, "show.json", organization_tax_rate: organization_tax_rate)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.ErrorView, "422.json", changeset: changeset)
    end
  end

end
