defmodule Pomerol.V1.OrganizationItemController do
  use Pomerol.Web, :controller
  alias Pomerol.{OrganizationItem, OrganizationItemAttachment}

  plug :load_and_authorize_changeset, model: OrganizationItem, only: [:create, :update]

  def create(conn, params) do
    changeset = OrganizationItem.create_changeset(%OrganizationItem{}, params)

    case Repo.insert(changeset) do
      {:ok, organization_item} ->
        insert_attachments(params["attachments"], organization_item)
        organization_item = Repo.get(OrganizationItem, organization_item.id) |> Repo.preload([:attachments])

        conn
        |> put_status(:created)
        |> render(Pomerol.OrganizationItemView, "organization_item.json", organization_item: organization_item)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.ErrorView, "422.json", changeset: changeset)
    end
  end

  defp insert_attachments(nil, organization_item), do: nil
  defp insert_attachments(attachments, organization_item) do
    Enum.map(attachments, &do_insert_attachment(&1, organization_item))
  end

  defp do_insert_attachment(organization_item_attachment, organization_item) do
    params =
      organization_item_attachment
      |> Map.put("organization_item_id", organization_item.id)

    %OrganizationItemAttachment{}
      |> OrganizationItemAttachment.create_changeset(params)
      |> Repo.insert
    {:ok, organization_item}
  end

  def update(conn, params) do
    # TODO
    conn
    |> json("ok")
  end
end
