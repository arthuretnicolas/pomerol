defmodule Pomerol.V1.QuoteController  do
  use Pomerol.Web, :controller

  alias Pomerol.{Quote}

  plug :load_and_authorize_changeset, model: Quote, only: [:create], preload: [:organization]

  def create(conn, params) do
    changeset = Quote.create_changeset(%Quote{}, params)

    case Repo.insert(changeset) do
      {:ok, quote} ->
        conn
        |> put_status(:created)
        |> json("ok")
        # |> render(Pomerol.ContactView, "contact.json", contact: contact)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.ChangesetView, "error.json", changeset: changeset)
    end
  end

end
